#include "api.hpp"

/**
 * Motors:
 * 0: Arm rotation
 * 1: Down Vertical Axis
 * 2: Upper Vertical Axis
 * 3: Pliers rotation
 * 4: Pliers
 */

/**
 * Rotate every motor to the middle position
 * @param motors: the motors object
 * @return 0 if success, 1 if error
 */
int basePos(Motors& motors)
{
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < 5; i++)
    {
        res = motors.setPosMid(i);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

/**
 * Rotate the first motor by *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
 */
int left(Motors& motors, int nb_degree)
{
    Motors::Status res = Motors::Status::SUCCESS;
    int left_pos = motors.getPos(0);

    for (int i = 0; i < nb_degree; i++)
    {
        left_pos += SERVO_UNIT;

        res = motors.setPos(0, left_pos);

        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

/**
 * Rotate the first motor by *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
 */
int right(Motors& motors, int nb_degree)
{
    int right_pos = motors.getPos(0);
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < nb_degree; i++)
    {
        right_pos -= SERVO_UNIT;

        res = motors.setPos(0, right_pos);

        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

/**
 * Rotate the second motor by *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
 */
int up(Motors& motors, int nb_degree)
{
    int up_pos_1 = motors.getPos(1);
    int up_pos_2 = motors.getPos(2);
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < nb_degree; i++)
    {
        up_pos_1 += SERVO_UNIT;
        res = motors.setPos(1, up_pos_1);
        if (res == Motors::Status::ERROR)
            return res;

        up_pos_2 -= SERVO_UNIT;
        res = motors.setPos(2, up_pos_2);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

/**
 * Rotate the second motor by - *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
 */
int down(Motors& motors, int nb_degree)
{
    int down_pos_1 = motors.getPos(1);
    int down_pos_2 = motors.getPos(2);
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < nb_degree; i++)
    {
        down_pos_1 -= SERVO_UNIT;
        res = motors.setPos(1, down_pos_1);
        if (res == Motors::Status::ERROR)
            return res;

        down_pos_2 += SERVO_UNIT;
        res = motors.setPos(2, down_pos_2);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

/**
 * Move the arm forward
 * @param motors: the motors object
 * @return 0 if success, 1 if error
 */
int forward(Motors& motors, int nb_degree)
{
    int positions[2] = { motors.getPos(1) - (nb_degree * SERVO_UNIT),
                         motors.getPos(2) - (nb_degree * SERVO_UNIT) };
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < 2; i++)
    {
        res = motors.setPos(i + 1, positions[i]);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

/**
 * Move the arm backward
 * @param motors: the motors object
 * @return 0 if success, 1 if error
 */
int backward(Motors& motors, int nb_degree)
{
    Motors::Status res = Motors::Status::SUCCESS;
    int positions[2] = { motors.getPos(1) + (nb_degree * SERVO_UNIT),
                         motors.getPos(2) + (nb_degree * SERVO_UNIT) };

    for (int i = 0; i < 2; i++)
    {
        res = motors.setPos(i + 1, positions[i]);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

/**
 * Rotate the fourth motor by *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
 */
int rotate_cw(Motors& motors, int nb_degree)
{
    int rotate_pos = motors.getPos(3);
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < nb_degree; i++)
    {
        rotate_pos += SERVO_UNIT;
        res = motors.setPos(3, rotate_pos);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

/**
 * Rotate the fourth motor by - *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
 */
int rotate_ccw(Motors& motors, int nb_degree)
{
    int rotate_pos = motors.getPos(3);
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < nb_degree; i++)
    {
        rotate_pos -= SERVO_UNIT;
        res = motors.setPos(3, rotate_pos);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

/**
 * Rotate the fifth motor by - *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
 */
int grab(Motors& motors, int nb_degree)
{
    int grab_pos = motors.getPos(4);
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < nb_degree; i++)
    {
        grab_pos += SERVO_UNIT;
        res = motors.setPos(4, grab_pos);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

/**
 * Rotate the fifth motor by *nb_degree* degrees
 * @param motors: the motors object
 * @param nb_degree: the number of degrees to rotate
 * @return 0 if success, 1 if error
 */
int release(Motors& motors, int nb_degree)
{
    int release_pos = motors.getPos(4);
    Motors::Status res = Motors::Status::SUCCESS;

    for (int i = 0; i < nb_degree; i++)
    {
        release_pos -= SERVO_UNIT;
        res = motors.setPos(4, release_pos);
        if (res == Motors::Status::ERROR)
            return res;
    }

    return res;
}

/**
 * Parse a command and gets its function pointer
 * @param command: the command to parse
 * @param name: the name of the command
 * @return 0 if success, 1 if error, -1 if command not found
 */
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
