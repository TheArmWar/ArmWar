#include "api.hpp"

// Min and Max pulse length in microseconds
#define SERVOMIN  135 // this is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX  475 // this is the 'maximum' pulse length count (out of 4096)
#define SERVOMID  305 // mid position
#define INTERVALLE 2000 // 2 seconds
#define FREQ 50 // 50 Hz

#define TURN_90  170
#define UNIT 2 // 2 unit ~= 1 degree

int basePos(Adafruit_PWMServoDriver pwm) {
  int res = 0;
  for (int i = 0; i < 3; i++) {
    res &= pwm.setPWM(i, 0, SERVOMID);
  }
}

int left(Adafruit_PWMServoDriver pwm, int nb_degree) {
  int left_pos = SERVOMID - (nb_degree * UNIT);
  return pwm.setPWM(0, 0, left_pos);
}

int right(Adafruit_PWMServoDriver pwm, int nb_degree) {
  int right_pos = SERVOMID + (nb_degree * UNIT);
  return pwm.setPWM(0, 0, right_pos);
}

int up(Adafruit_PWMServoDriver pwm, int nb_degree) {
  int up_pos = SERVOMID + (nb_degree * UNIT);
  return pwm.setPWM(1, 0, up_pos);
}

int down(Adafruit_PWMServoDriver pwm, int nb_degree) {
  int down_pos = SERVOMID - (nb_degree * UNIT);
  return pwm.setPWM(1, 0, down_pos);
}

int forward(Adafruit_PWMServoDriver pwm) {
  int res = 0;
  int  positions[3] = {SERVOMIN, SERVOMAX, 305};
  for (int i = 0; i < 3; i++) {
    res &= pwm.setPWM(i, 0, positions[i]);
  }
  return res;
}

int backward(Adafruit_PWMServoDriver pwm) {
  int res = 0;
  int  positions[3] = {SERVOMIN, SERVOMAX, 305};
  for (int i = 0; i < 3; i++) {
    res &= pwm.setPWM(i, 0, positions[i]);
  }
  return res;
}

int rotate_cw(Adafruit_PWMServoDriver pwm, int nb_degree) {
  int rotate_pos = SERVOMID + (nb_degree * UNIT);
  return pwm.setPWM(4, 0, rotate_pos);
}

int rotate_ccw(Adafruit_PWMServoDriver pwm, int nb_degree) {
  int rotate_pos = SERVOMID - (nb_degree * UNIT);
  return pwm.setPWM(4, 0, rotate_pos);
}

int grab(Adafruit_PWMServoDriver pwm, int nb_degree) {
  int grab_pos = SERVOMID + (nb_degree * UNIT);
  return pwm.setPWM(5, 0, grab_pos);
}

int release(Adafruit_PWMServoDriver pwm, int nb_degree) {
  int release_pos = SERVOMID - (nb_degree * UNIT);
  return pwm.setPWM(5, 0, release_pos);
}

// stated command
int command(armwar_StatedCommand command, Adafruit_PWMServoDriver pwm) {
  int nb_degree = 45;
  switch (command.command)
  {
  case armwar_Command_UP:
    return up(pwm, nb_degree);
    break;
  case armwar_Command_DOWN:
    return down(pwm, nb_degree);
    break;
  case armwar_Command_LEFT:
    return left(pwm, nb_degree);
    break;
  case armwar_Command_RIGHT:
    return right(pwm, nb_degree);
    break;
  case armwar_Command_FORWARD:
    return forward(pwm);
    break;
  case armwar_Command_BACKWARD:
    return backward(pwm);
    break;
  case armwar_Command_ROTATE_CW:
    return rotate_cw(pwm, nb_degree);
    break;
  case armwar_Command_ROTATE_CCW:
    return rotate_ccw(pwm, nb_degree);
    break;
  case armwar_Command_GRAB:
    return grab(pwm, nb_degree);
    break;
  case armwar_Command_RELEASE:
    return release(pwm, nb_degree);
    break;
  default:
    return -1;
    break;
  }
}


