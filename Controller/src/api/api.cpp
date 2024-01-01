#include "api.hpp"

// Min and Max pulse length in microseconds
#define SERVOMIN 90 // this is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX 420 // this is the 'maximum' pulse length count (out of 4096)
#define SERVOMID 305 // mid position
#define INTERVALLE 2000 // 2 seconds
#define FREQ 50 // 50 Hz

#define TURN_90 170
#define UNIT 1 // 2 unit ~= 1 degree

// Current position of all motors
int curr_pos[] = { 305, 305, 305, 305, 305 };

// Base position of all motors
int base_pos[] = { 305, 305, 305, 305, 305 };

// Motors pins
int motors[] = { 0, 3, 7, 11, 15 };

/**
 * Motors:
 * 0: Arm rotation
 * 1: Down Vertical Axis
 * 2: Upper Vertical Axis
 * 3: Pliers rotation
 * 4: Pliers
 */

int basePos(Adafruit_PWMServoDriver pwm)
{
    int res = 0;
    for (int i = 0; i < 3; i++)
    {
        res &= pwm.setPWM(motors[i], 0, base_pos[i]);
    }
}

int left(Adafruit_PWMServoDriver pwm, int nb_degree)
{
    int left_pos = curr_pos[0];
    int res = 0;
    for (int i = 0; i < nb_degree; i++)
    {
        left_pos += UNIT;
        if (left_pos < SERVOMIN)
        {
            left_pos = SERVOMIN;
        }
        res &= pwm.setPWM(motors[0], 0, left_pos);
        delay(100);
    }
    curr_pos[0] = left_pos;
    return res;
}

int right(Adafruit_PWMServoDriver pwm, int nb_degree)
{
    int right_pos = curr_pos[0];
    int res = 0;
    for (int i = 0; i < nb_degree; i++)
    {
        right_pos -= UNIT;
        if (right_pos > SERVOMAX)
        {
            right_pos = SERVOMAX;
        }
        res &= pwm.setPWM(motors[0], 0, right_pos);
        delay(100);
    }
    curr_pos[0] = right_pos;
    return res;
}

/**
 * Motor[1] -> add
 * Motor[2] -> sub
 */
int up(Adafruit_PWMServoDriver pwm, int nb_degree)
{
    int up_pos_1 = curr_pos[1];
    int up_pos_2 = curr_pos[2];
    int res = 0;
    for (int i = 0; i < nb_degree; i++)
    {
        up_pos_1 += UNIT;
        if (up_pos_1 > SERVOMAX)
        {
            up_pos_1 = SERVOMAX;
        }
        res &= pwm.setPWM(motors[1], 0, up_pos_1);

        up_pos_2 -= UNIT;
        if (up_pos_2 < SERVOMIN)
        {
            up_pos_2 = SERVOMIN;
        }
        res &= pwm.setPWM(motors[2], 0, up_pos_2);
        delay(100);
    }
    curr_pos[1] = up_pos_1;
    curr_pos[2] = up_pos_2;
    return res;
}

/**
 * Motor[1] -> sub
 * Motor[2] -> add
 */
int down(Adafruit_PWMServoDriver pwm, int nb_degree)
{
    int down_pos_1 = curr_pos[1];
    int down_pos_2 = curr_pos[2];
    int res = 0;
    for (int i = 0; i < nb_degree; i++)
    {
        down_pos_1 -= UNIT;
        if (down_pos_1 < SERVOMIN)
        {
            down_pos_1 = SERVOMIN;
        }
        res &= pwm.setPWM(motors[1], 0, down_pos_1);

        down_pos_2 += UNIT;
        if (down_pos_2 > SERVOMAX)
        {
            down_pos_2 = SERVOMAX;
        }
        res &= pwm.setPWM(motors[2], 0, down_pos_2);
        delay(100);
    }
    curr_pos[1] = down_pos_1;
    curr_pos[2] = down_pos_2;
    return res;
}

int forward(Adafruit_PWMServoDriver pwm, int nb_degree)
{
    int res = 0;
    int positions[2] = { curr_pos[1] - (nb_degree * UNIT),
                         curr_pos[2] - (nb_degree * UNIT) };
    for (int i = 0; i < 2; i++)
    {
        res &= pwm.setPWM(motors[i + 1], 0, positions[i]);
    }
    return res;
}

int backward(Adafruit_PWMServoDriver pwm, int nb_degree)
{
    int res = 0;
    int positions[2] = { curr_pos[1] + (nb_degree * UNIT),
                         curr_pos[2] + (nb_degree * UNIT) };
    for (int i = 0; i < 2; i++)
    {
        res &= pwm.setPWM(motors[i + 1], 0, positions[i]);
    }
    return res;
}

int rotate_cw(Adafruit_PWMServoDriver pwm, int nb_degree)
{
    int rotate_pos = curr_pos[3];
    int res = 0;
    for (int i = 0; i < nb_degree; i++)
    {
        rotate_pos += UNIT;
        if (rotate_pos > SERVOMAX)
        {
            rotate_pos = SERVOMAX;
        }
        res &= pwm.setPWM(motors[3], 0, rotate_pos);
        delay(100);
    }
    curr_pos[3] = rotate_pos;
    return res;
}

int rotate_ccw(Adafruit_PWMServoDriver pwm, int nb_degree)
{
    int rotate_pos = curr_pos[3];
    int res = 0;
    for (int i = 0; i < nb_degree; i++)
    {
        rotate_pos -= UNIT;
        if (rotate_pos < SERVOMIN)
        {
            rotate_pos = SERVOMIN;
        }
        res &= pwm.setPWM(motors[3], 0, rotate_pos);
        delay(100);
    }
    curr_pos[3] = rotate_pos;
    return res;
}

int grab(Adafruit_PWMServoDriver pwm, int nb_degree)
{
    int grab_pos = curr_pos[4];
    int res = 0;
    for (int i = 0; i < nb_degree; i++)
    {
        grab_pos += UNIT;
        if (grab_pos > SERVOMAX)
        {
            grab_pos = SERVOMAX;
        }
        res &= pwm.setPWM(motors[4], 0, grab_pos);
        delay(100);
    }
    curr_pos[4] = grab_pos;
    return res;
}

int release(Adafruit_PWMServoDriver pwm, int nb_degree)
{
    int release_pos = curr_pos[4];
    int res = 0;
    for (int i = 0; i < nb_degree; i++)
    {
        release_pos -= UNIT;
        if (release_pos < SERVOMIN)
        {
            release_pos = SERVOMIN;
        }
        res &= pwm.setPWM(motors[4], 0, release_pos);
        delay(100);
    }
    curr_pos[4] = release_pos;
    return res;
}

func parse_command(armwar_Command command)
{
    switch (command)
    {
    case armwar_Command_UP:
        Serial.println("UP");
        return &up;
    case armwar_Command_DOWN:
        Serial.println("DOWN");
        return &down;
    case armwar_Command_LEFT:
        Serial.println("LEFT");
        return &left;
    case armwar_Command_RIGHT:
        Serial.println("RIGHT");
        return &right;
    case armwar_Command_FORWARD:
        Serial.println("FORWARD");
        return &forward;
    case armwar_Command_BACKWARD:
        Serial.println("BACKWARD");
        return &backward;
    case armwar_Command_ROTATE_CW:
        Serial.println("ROTATE_CW");
        return &rotate_cw;
    case armwar_Command_ROTATE_CCW:
        Serial.println("ROTATE_CCW");
        return &rotate_ccw;
    case armwar_Command_GRAB:
        Serial.println("GRAB");
        return &grab;
    case armwar_Command_RELEASE:
        Serial.println("RELEASE");
        return &release;
    default:
        return NULL;
    }
}
