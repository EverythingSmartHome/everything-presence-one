#include "esphome.h"
#include <string>

class Sen0395Distance : public Component, public UARTDevice {
public:
  Sen0395Distance(UARTComponent *parent) : UARTDevice(parent) {}

  float t_snr[10] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
  float t_distance[10] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
  bool t_active[10] = {false, false, false, false, false, false, false, false, false, false};

  void setup() override {
    // nothing to do here
  }

  int readline(int readch, char *buffer, int len) {
    static int pos = 0;
    int rpos;

    if (readch > 0) {
      switch (readch) {
        case '\n': // Ignore new-lines
          break;
        case '\r': // Return on CR
          rpos = pos;
          pos = 0; // Reset position index ready for next time
          return rpos;
        default:
          if (pos < len - 1) {
            buffer[pos++] = readch;
            buffer[pos] = 0;
          }
      }
    }
    // No end of line has been found, so return -1.
    return -1;
  }

  void loop() override {
    const int max_line_length = 40;
    static char buffer[max_line_length];

    while (available()) {
      if (readline(read(), buffer, max_line_length) >= 4) {
        std::string line = buffer;

        if (line.substr(0, 6) == "$JYRPO") {
          std::string vline = line.substr(6);
          std::vector<std::string> v;
          for (int i = 0; i < vline.length(); i++) {
            if (vline[i] == ',') {
              v.push_back("");
            } else {
              v.back() += vline[i];
            }
          }
          int target_count = parse_number<int>(v[0]).value();
          int target_index = parse_number<int>(v[1]).value();
          float target_distance = parse_number<float>(v[2]).value();
          float target_snr = parse_number<float>(v[4]).value();

          // Update the SNR, distance, and active status for the current target index
          t_snr[target_index] = target_snr;
          t_distance[target_index] = target_distance;
          t_active[target_index] = true;

          if (target_count == target_index) {
            // Publish the data for each target without sorting
            for (int i = 1; i <= target_count; i++) {
              auto get_sensors = App.get_sensors();
              for (int j = 0; j < get_sensors.size(); j++) {
                std::string name = get_sensors[j]->get_name();
                if (name == "Target " + std::to_string(i) + " Distance") {
                  get_sensors[j]->publish_state(t_distance[i]);
                } else if (name == "Target " + std::to_string(i) + " SNR") {
                  get_sensors[j]->publish_state(t_snr[i]);
                }
              }
            }

            // Publish the state of the binary sensor for each target
            for (int i = 1; i <= 10; i++) {
              auto get_binary_sensors = App.get_binary_sensors();
              for (int j = 0; j < get_binary_sensors.size(); j++) {
                std::string name = get_binary_sensors[j]->get_name();
                if (name == "Target " + std::to_string(i) + " Active") {
                  get_binary_sensors[j]->publish_state(t_active[i]);
                }
              }
            }

            for (int i = target_count + 1; i <= 9; i++) {
              t_active[i] = false;
            }

            //ESP_LOGD("custom", "Target %d Distance: %f, SNR: %f", i, t_distance[i], t_snr[i]);
          }
        }
      }
    }
  }
};
