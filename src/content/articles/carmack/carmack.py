import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

d0 = pd.read_csv("/Users/olivier/Programmation/carmack/ss0.csv", names=['seed', 'val'])

plt.plot(d0['seed'], d0['val'])

d1 = pd.read_csv("/Users/olivier/Programmation/carmack/ss1.csv", names=['seed', 'val'])

d2 = pd.read_csv("/Users/olivier/Programmation/carmack/s2.csv", names=['seed', 'val'])

plt.plot(d1['seed'], d1['val'])

plt.plot(d0['seed'], np.log(d0['val']))
plt.plot(d1['seed'], np.log(d1['val']))
plt.plot(d2['seed'], np.log(d2['val']))

d0['val'].min()
d1['val'].min()
d2['val'].min()

d0[d0.val == d0['val'].min()]['seed']

d1[d1.val == d1['val'].min()]

d2[d2.val == d2['val'].min()]

"{:x}".format(1597454390)

dd1 = pd.read_csv("/Users/olivier/Programmation/carmack/sss1.csv", names=['seed', 'val'])

dd1[dd1.val == dd1['val'].min()]
"{:x}".format(1597463173)

plt.plot(dd1['seed'], np.log(dd1['val']))
