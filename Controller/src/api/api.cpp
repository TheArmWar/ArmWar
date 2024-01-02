#include "api.hpp"

#define SERVOMID 305 // mid position
#define INTERVALLE 2000 // 2 seconds
#define FREQ 50 // 50 Hz

#define TURN_90 170
#define UNIT 1 // 2 unit ~= 1 degree

/**
 * Motors:
 * 0: Arm rotation
 * 1: Down Vertical Axis
 * 2: Upper Vertical Axis
 * 3: Pliers rotation
 * 4: Pliers
 */

int basePos(Motors& motors)
{
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < 5; i++)
    {
        res = motors.setPos(i, SERVOMID);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

int left(Motors& motors, int nb_degree)
{
    Motors::Status res = Motors::Status::SUCCESS;
    int left_pos = motors.getPos(0);

    for (int i = 0; i < nb_degree; i++)
    {
        left_pos += UNIT;

        res = motors.setPos(0, left_pos);

        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

int right(Motors& motors, int nb_degree)
{
    int right_pos = motors.getPos(0);
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < nb_degree; i++)
    {
        right_pos -= UNIT;

        res = motors.setPos(0, right_pos);

        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

/**
 * Motor[1 -> add
 * Motor[2 -> sub
 */
int up(Motors& motors, int nb_degree)
{
    int up_pos_1 = motors.getPos(1);
    int up_pos_2 = motors.getPos(2);
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < nb_degree; i++)
    {
        up_pos_1 += UNIT;
        res = motors.setPos(1, up_pos_1);
        if (res == Motors::Status::ERROR)
            return res;

        up_pos_2 -= UNIT;
        res = motors.setPos(2, up_pos_2);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

/**
 * Motor[1 -> sub
 * Motor[2 -> add
 */
int down(Motors& motors, int nb_degree)
{
    int down_pos_1 = motors.getPos(1);
    int down_pos_2 = motors.getPos(2);
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < nb_degree; i++)
    {
        down_pos_1 -= UNIT;
        res = motors.setPos(1, down_pos_1);
        if (res == Motors::Status::ERROR)
            return res;

        down_pos_2 += UNIT;
        res = motors.setPos(2, down_pos_2);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

int forward(Motors& motors, int nb_degree)
{
    int positions[2] = { motors.getPos(1) - (nb_degree * UNIT),
                         motors.getPos(2) - (nb_degree * UNIT) };
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < 2; i++)
    {
        res = motors.setPos(i + 1, positions[i]);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

int backward(Motors& motors, int nb_degree)
{
    Motors::Status res = Motors::Status::SUCCESS;
    int positions[2] = { motors.getPos(1) + (nb_degree * UNIT),
                         motors.getPos(2) + (nb_degree * UNIT) };

    for (int i = 0; i < 2; i++)
    {
        res = motors.setPos(i + 1, positions[i]);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

int rotate_cw(Motors& motors, int nb_degree)
{
    int rotate_pos = motors.getPos(3);
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < nb_degree; i++)
    {
        rotate_pos += UNIT;
        res = motors.setPos(3, rotate_pos);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

int rotate_ccw(Motors& motors, int nb_degree)
{
    int rotate_pos = motors.getPos(3);
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < nb_degree; i++)
    {
        rotate_pos -= UNIT;
        res = motors.setPos(3, rotate_pos);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

int grab(Motors& motors, int nb_degree)
{
    int grab_pos = motors.getPos(4);
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < nb_degree; i++)
    {
        grab_pos += UNIT;
        res = motors.setPos(4, grab_pos);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

int release(Motors& motors, int nb_degree)
{
    int release_pos = motors.getPos(4);
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < nb_degree; i++)
    {
        release_pos -= UNIT;
        res = motors.setPos(4, release_pos);
        if (res == Motors::Status::ERROR)
            return res;
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
