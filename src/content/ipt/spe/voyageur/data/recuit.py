import csv
import numpy as np
import random
import matplotlib.pyplot as plt
import pylab
from matplotlib.widgets import Button

import inspect
import os

# Ne pas modifier ###############################

os.chdir(os.path.dirname(os.path.abspath(inspect.getsourcefile(lambda: 0))))

#################################################
# I. Le problème du voyageur de commerce
#################################################

capitals = []

with open('capitales_etats.csv', 'r') as csvfile:
    csvfile = csv.reader(csvfile, delimiter='\t')
    for line in csvfile:
        print(line)


def dist(lat1, lng1, lat2, lng2):
    ...


def distance_circuit(l):
    ...


#################################################
# II. Optimisation locale
#################################################

# Attention, cette fonction doit renvoyer un booléen.
# De plus, la liste L n'aura été modifiée QUE SI l'on renvoie True.


def échange(L, i, j):
    ...


#################################################
# Simulation graphique
#################################################

# Température initiale

T = 1000

# Création de l'interface graphique

pylab.ion()
plt.ion()

plt.close()

fig = plt.figure()

# # Indicateurs textuels

text_dist = fig.text(
    0.05, .05, "Distance : {:06.2f} km".format(distance_circuit(capitals)))

# text_temp = fig.text(0.05, .10, "Temperature : {:06.6f}°".format(T))

# # Boutons

# ## Boutons de modification de la température

# def reheat100(event):
#     global T
#     ...

# t100 = plt.axes([0.46, 0.05, 0.15, 0.05])
# bt100 = Button(t100, "+100°")
# bt100.on_clicked(reheat100)

# def reheat1000(event):
#     global T
#     ...

# t1000 = plt.axes([0.63, 0.05, 0.15, 0.05])
# bt1000 = Button(t1000, "+1000°")
# bt1000.on_clicked(reheat1000)

# ## Bouton de mélange


def melanger_capitales(event):
    ...


shuf = plt.axes([0.80, 0.05, 0.15, 0.05])
bshuf = Button(shuf, "Mélanger")
bshuf.on_clicked(melanger_capitales)

# ## Bouton d'arrêt

cont = True


def stop_simulation(event):
    global cont
    cont = False


stoppeur = plt.axes([0.80, 0.12, 0.15, 0.05])
bstop = Button(stoppeur, "Stop")
bstop.on_clicked(stop_simulation)

# # Tracé du circuit

ax = fig.add_subplot(111, autoscale_on=False, xlim=(-130, -65), ylim=(28, 48))
ax.axis('off')
lx = [c[3] for c in capitals]
ly = [c[2] for c in capitals]
lignes, = ax.plot(lx + lx[0:1], ly + ly[0:1])


def simulation():
    global cont
    cont = True
    essais = 100
    while cont:
        i = random.randint(0, len(capitals) - 1)
        j = (i + random.randint(1, len(capitals) - 1)) % len(capitals)
        if échange(capitals, i, j):
            lx = [c[3] for c in capitals]
            ly = [c[2] for c in capitals]
            lignes.set_data(lx + lx[0:1], ly + ly[0:1])
            text_dist.set_text("Distance : {:06.2f} km".format(
                distance_circuit(capitals)))
            # text_temp.set_text("Temperature : {:06.6f}°".format(T))
            essais = 0
        else:
            essais -= 1
        if essais == 0:
            plt.pause(0.1)
            essais = 100


# simulation()
