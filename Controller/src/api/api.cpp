#include "api.hpp"

// Min and Max pulse length in microseconds
#define SERVOMIN 90 // this is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX 420 // this is the 'maximum' pulse length count (out of 4096)
#define SERVOMID 305 // mid position
#define INTERVALLE 2000 // 2 seconds
#define FREQ 50 // 50 Hz

#define TURN_90 170
#define UNIT 1 // 2 unit ~= 1 degree

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

uint16_t get(Adafruit_PWMServoDriver& pwm, uint8_t pin)
{
    return pwm.getPWM(pin, true);
}

int set(Adafruit_PWMServoDriver& pwm, uint8_t pin, uint16_t position)
{
    if (position < SERVOMIN)
        position = SERVOMIN;
    else if (position > SERVOMAX)
        position = SERVOMAX;

    return pwm.setPWM(pin, 0, position);
}

int basePos(Adafruit_PWMServoDriver& pwm)
{
    int res = 0;

    for (int i = 0; i < 4; i++)
        res |= set(pwm, motors[i], SERVOMID);

    return res;
}

int left(Adafruit_PWMServoDriver& pwm, int nb_degree)
{
    int left_pos = get(pwm, motors[0]);
    int res = 0;

    for (int i = 0; i < nb_degree; i++)
    {
        left_pos += UNIT;

        res |= set(pwm, motors[0], left_pos);

        // delay(100);
    }

    return res;
}

int right(Adafruit_PWMServoDriver& pwm, int nb_degree)
{
    int right_pos = get(pwm, motors[0]);
    int res = 0;

    for (int i = 0; i < nb_degree; i++)
    {
        right_pos -= UNIT;

        res |= set(pwm, motors[0], right_pos);

        // delay(100);
    }

    return res;
}

/**
 * Motor[1] -> add
 * Motor[2] -> sub
 */
int up(Adafruit_PWMServoDriver& pwm, int nb_degree)
{
    int up_pos_1 = get(pwm, motors[1]);
    int up_pos_2 = get(pwm, motors[2]);
    int res = 0;

    for (int i = 0; i < nb_degree; i++)
    {
        up_pos_1 += UNIT;
        res |= set(pwm, motors[1], up_pos_1);

        up_pos_2 -= UNIT;
        res |= set(pwm, motors[2], up_pos_2);

        // delay(100);
    }

    return res;
}

/**
 * Motor[1] -> sub
 * Motor[2] -> add
 */
int down(Adafruit_PWMServoDriver& pwm, int nb_degree)
{
    int down_pos_1 = get(pwm, motors[1]);
    int down_pos_2 = get(pwm, motors[2]);
    int res = 0;

    for (int i = 0; i < nb_degree; i++)
    {
        down_pos_1 -= UNIT;
        res |= set(pwm, motors[1], down_pos_1);

        down_pos_2 += UNIT;
        res |= set(pwm, motors[2], down_pos_2);
        // delay(100);
    }

    return res;
}

int forward(Adafruit_PWMServoDriver& pwm, int nb_degree)
{
    int positions[2] = { get(pwm, motors[1]) - (nb_degree * UNIT),
                         get(pwm, motors[2]) - (nb_degree * UNIT) };
    int res = 0;

    for (int i = 0; i < 2; i++)
    {
        res |= set(pwm, motors[i + 1], positions[i]);
    }

    return res;
}

int backward(Adafruit_PWMServoDriver& pwm, int nb_degree)
{
    int res = 0;
    int positions[2] = { get(pwm, motors[1]) + (nb_degree * UNIT),
                         get(pwm, motors[2]) + (nb_degree * UNIT) };

    for (int i = 0; i < 2; i++)
    {
        res |= set(pwm, motors[i + 1], positions[i]);
    }

    return res;
}

int rotate_cw(Adafruit_PWMServoDriver& pwm, int nb_degree)
{
    int rotate_pos = get(pwm, motors[3]);
    int res = 0;

    for (int i = 0; i < nb_degree; i++)
    {
        rotate_pos += UNIT;

        res |= set(pwm, motors[3], rotate_pos);

        // delay(100);
    }

    return res;
}

int rotate_ccw(Adafruit_PWMServoDriver& pwm, int nb_degree)
{
    int rotate_pos = get(pwm, motors[3]);
    int res = 0;

    for (int i = 0; i < nb_degree; i++)
    {
        rotate_pos -= UNIT;

        res |= set(pwm, motors[3], rotate_pos);

        // delay(100);
    }

    return res;
}

int grab(Adafruit_PWMServoDriver& pwm, int nb_degree)
{
    int grab_pos = get(pwm, motors[4]);
    int res = 0;

    for (int i = 0; i < nb_degree; i++)
    {
        grab_pos += UNIT;

        res |= set(pwm, motors[4], grab_pos);

        // delay(100);
    }

    return res;
}

int release(Adafruit_PWMServoDriver& pwm, int nb_degree)
{
    int release_pos = get(pwm, motors[4]);
    int res = 0;

    for (int i = 0; i < nb_degree; i++)
    {
        release_pos -= UNIT;

        res |= set(pwm, motors[4], release_pos);

        // delay(100);
    }

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
