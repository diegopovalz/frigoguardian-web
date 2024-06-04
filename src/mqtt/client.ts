// mqtt.js
import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://industrial.api.ubidots.com', {
  username: 'BBUS-I9UF1izg1Kq8ZJ1QTW6OvJDC6jTTck',
  password: '',
  port: 1883,
});

export default client;
