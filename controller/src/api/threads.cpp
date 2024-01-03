#include "threads.hpp"

#include "../config/config.hpp"

Thread::Thread()
{}

Thread::Thread(std::function<void()> worker)
    : should_stop(false)
{
    // Launch thread
    this->instance = std::thread([this, worker] {
        while (!this->should_stop)
            worker();
    });
}

void Thread::stop(void)
{
    this->should_stop = true;
}

void Thread::join(void)
{
    this->instance.join();
}
