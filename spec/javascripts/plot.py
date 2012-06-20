import numpy as np
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import colorsys

def randrange(n, vmin, vmax):
    return (vmax-vmin)*np.random.rand(n) + vmin

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
n = 100
xs = []
ys = []
zs = []
xs2 = []
ys2 = []
zs2 = []

f = open("beige_colors.txt").read().strip().split("\n")

for color in f:
    r = int(color[1:3],16)
    g = int(color[3:5],16)
    b = int(color[5:6],16)
    hsl = colorsys.rgb_to_hls(r,g,b)
    xs.append(hsl[0])
    ys.append(hsl[1]*20)
    zs.append(hsl[2]*20)

f = open("not_beige.txt").read().strip().split("\n")
for color in f:
    r = int(color[1:3],16)
    g = int(color[3:5],16)
    b = int(color[5:6],16)
    hsl = colorsys.rgb_to_hls(r,g,b)
    xs2.append(hsl[0])
    ys2.append(hsl[1]*20)
    zs2.append(hsl[2]*20)

ax.scatter(xs, ys, zs)
ax.scatter(xs2, ys2, zs2,c="red")

ax.set_xlabel('H Label')
ax.set_ylabel('L Label')
ax.set_zlabel('S Label')

plt.show()
