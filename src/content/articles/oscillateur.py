import numpy as np
import math

dt = 0.01
n = 1000000

cdt = math.cos(dt)
sdt = math.sin(dt)

def simul_exact(n):
    x = 1.
    v = 0.
    for _ in range(n):
        nx = cdt * x - sdt * v
        v = cdt * v + sdt * x
        x = nx
    return (x, v)

# simul_exact(1000000)
# -> (-0.9521553682453002, 0.3056143888838075)

math.cos(n * dt)
math.sin(n * dt)