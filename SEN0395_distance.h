#include "esphome.h"
#include <string>

class Sen0395Distance : public Component, public UARTDevice {
public:
  Sen0395Distance(UARTComponent *parent) : UARTDevice(parent) {}

float t_snr[10] = {0,0,0,0,0,0,0,0,0,0};
float t_distance[10] = {0,0,0,0,0,0,0,0,0,0};

void setup() override {
    // nothing to do here
}

int readline(int readch, char *buffer, int len)
{
  static int pos = 0;
  int rpos;

  if (readch > 0) {
    switch (readch) {
      case '\n': // Ignore new-lines
        break;
      case '\r': // Return on CR
        rpos = pos;
        pos = 0;  // Reset position index ready for next time
        return rpos;
      default:
        if (pos < len-1) {
          buffer[pos++] = readch;
          buffer[pos] = 0;
        }
    }
  }
  // No end of line has been found, so return -1.
  return -1;
}


std::string getline;

void loop() override {
const int max_line_length = 40;
    static char buffer[max_line_length];

    while (available()) {
      if(readline(read(), buffer, max_line_length) >= 4) {
        std::string line = buffer;


        if (line.substr(0, 6) == "$JYRPO") {
          std::string vline = line.substr(6);
          std::vector<std::string> v;    
          for(int i = 0; i < vline.length(); i++) {
              if(vline[i] == ',') {
                  v.push_back("");
              } else {
                  v.back() += vline[i];
              }
          }
          int target_count = parse_number<int>(v[0]).value();
          int target_index = parse_number<int>(v[1]).value();
          float target_distance = parse_number<float>(v[2]).value();
          float target_snr = parse_number<float>(v[4]).value();

         // ESP_LOGD("custom","target_count: %d", target_count);
         // ESP_LOGD("custom","target_index: %d", target_index);
         // ESP_LOGD("custom","target_snr: %f", target_snr);
         // ESP_LOGD("custom","target_distance: %f", target_distance);

          t_snr[target_index] = target_snr;
          t_distance[target_index] = target_distance;

          if(target_count == target_index){
            float max_snr = 0;
            float max_distance = 0;
            int max_index = 0;
            for(int i =1; i<= target_count;i++){
              if(t_snr[i] > max_snr){
                max_snr = t_snr[i];
                max_distance = t_distance[i];
                max_index = i;
              }
            }

            auto get_sensors = App.get_sensors();
            for(int i = 0; i < get_sensors.size(); i++) {
              std::string name = get_sensors[i]->get_name();
                if(name == "Target Distance m") {
                  get_sensors[i]->publish_state(max_distance);
                } 
            }
            
            ESP_LOGD("custom","%f, %f, %f, %f, %f, %f, %f, %f, %f",t_snr[1],t_snr[2],t_snr[3],t_snr[4],t_snr[5],t_snr[6],t_snr[7],t_snr[8],t_snr[9]);
            ESP_LOGD("custom","%f, %f, %f, %f, %f, %f, %f, %f, %f",t_distance[1],t_distance[2],t_distance[3],t_distance[4],t_distance[5],t_distance[6],t_distance[7],t_distance[8],t_distance[9]);            
            ESP_LOGD("custom","Distance: %f",max_distance);
            ESP_LOGD("custom","SNR: %f",t_snr[max_index]);
            ESP_LOGD("custom","Distance: %f",max_distance);
            ESP_LOGD("custom","idx: %d",max_index);
          }
        }
        getline = buffer; 
    }
  }
}
};
