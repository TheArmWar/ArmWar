#include "api.hpp"

// Min and Max pulse length in microseconds
#define SERVOMIN 90     // this is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX 420    // this is the 'maximum' pulse length count (out of 4096)
#define SERVOMID 305    // mid position
#define INTERVALLE 2000 // 2 seconds
#define FREQ 50 // 50 Hz

#define TURN_90  170
#define UNIT 20 // 2 unit ~= 1 degree

// Base position of all motors
int curr_pos[] = {305, 305, 305, 305, 305};

// Motors pins
int motors[] = {0, 3, 7, 11, 15};

int basePos(Adafruit_PWMServoDriver pwm)
{
  int res = 0;
  for (int i = 0; i < 3; i++)
  {
    res &= pwm.setPWM(motors[i], 0, SERVOMID);
  }
}

int left(Adafruit_PWMServoDriver pwm, int nb_degree)
{
  int left_pos = curr_pos[0];
  int res = 0;
  for (int i = 0; i < nb_degree; i++)
  {
    left_pos -= UNIT;
    if (left_pos < SERVOMIN)
    {
      left_pos = SERVOMIN;
    }
    res &= pwm.setPWM(motors[0], 0, left_pos);
    delay(10);
  }
  curr_pos[0] = left_pos;
  return res;
}

int right(Adafruit_PWMServoDriver pwm, int nb_degree)
{
  int right_pos = curr_pos[0] + (nb_degree * UNIT);
  if (right_pos > SERVOMAX)
  {
    right_pos = SERVOMAX;
  }
  return pwm.setPWM(motors[0], 0, right_pos);
}

int up(Adafruit_PWMServoDriver pwm, int nb_degree)
{
  int up_pos = curr_pos[1] + (nb_degree * UNIT);
  return pwm.setPWM(motors[1], 0, up_pos);
}

int down(Adafruit_PWMServoDriver pwm, int nb_degree)
{
  int down_pos = curr_pos[1] - (nb_degree * UNIT);
  return pwm.setPWM(motors[1], 0, down_pos);
}

int forward(Adafruit_PWMServoDriver pwm, int nb_degree) {
  int res = 0;
  int positions[2] = {curr_pos[1] - (nb_degree * UNIT), curr_pos[2] - (nb_degree * UNIT)};
  for (int i = 0; i < 2; i++)
  {
    res &= pwm.setPWM(motors[i], 0, positions[i]);
  }
  return res;
}

int backward(Adafruit_PWMServoDriver pwm, int nb_degree) {
  int res = 0;
  int positions[2] = {curr_pos[1] + (nb_degree * UNIT), curr_pos[2] + (nb_degree * UNIT)};
  for (int i = 0; i < 2; i++)
  {
    res &= pwm.setPWM(motors[i], 0, positions[i]);
  }
  return res;
}

int rotate_cw(Adafruit_PWMServoDriver pwm, int nb_degree)
{
  int rotate_pos = curr_pos[3] + (nb_degree * UNIT);
  if (rotate_pos > SERVOMAX)
  {
    rotate_pos = SERVOMAX;
  }
  return pwm.setPWM(motors[3], 0, rotate_pos);
}

int rotate_ccw(Adafruit_PWMServoDriver pwm, int nb_degree)
{
  int rotate_pos = curr_pos[3] - (nb_degree * UNIT);
  if (rotate_pos < SERVOMIN)
  {
    rotate_pos = SERVOMIN;
  }
  return pwm.setPWM(motors[3], 0, rotate_pos);
}

int grab(Adafruit_PWMServoDriver pwm, int nb_degree)
{
  int grab_pos = curr_pos[4] + (nb_degree * UNIT);
  if (grab_pos > SERVOMAX)
  {
    grab_pos = SERVOMAX;
  }
  return pwm.setPWM(motors[4], 0, grab_pos);
}

int release(Adafruit_PWMServoDriver pwm, int nb_degree)
{
  int release_pos = curr_pos[4] - (nb_degree * UNIT);
  if (release_pos < SERVOMIN)
  {
    release_pos = SERVOMIN;
  }
  return pwm.setPWM(curr_pos[4], 0, release_pos);
}

func parse_command(armwar_Command command)
{
  switch (command)
  {
  case armwar_Command_UP:
    return &up;
  case armwar_Command_DOWN:
    return &down;
  case armwar_Command_LEFT:
    return &left;
  case armwar_Command_RIGHT:
    return &right;
  case armwar_Command_FORWARD:
    return &forward;
  case armwar_Command_BACKWARD:
    return &backward;
  case armwar_Command_ROTATE_CW:
    return &rotate_cw;
  case armwar_Command_ROTATE_CCW:
    return &rotate_ccw;
  case armwar_Command_GRAB:
    return &grab;
  case armwar_Command_RELEASE:
    return &release;
  default:
    return NULL;
  }
}
