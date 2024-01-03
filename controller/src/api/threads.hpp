#pragma once

#include <functional>
#include <thread>

#include "api.hpp"
#include "motors.hpp"

class Thread
{
public:
    Thread();
    Thread(std::function<void()> worker);
    void stop(void);
    void join(void);

protected:
    std::thread instance;
    bool should_stop;
};
