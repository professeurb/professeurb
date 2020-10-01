# %%

import random

# %%


def insertion(t, debut, fin):
    for i in range(debut + 1, fin):
        v = t[i]
        j = i - 1
        while j >= debut and t[j] > v:
            t[j + 1] = t[j]
            j -= 1
        t[j + 1] = v


# %%


def partition(t, debut, fin, pivot):
    gauche = debut
    milieu = debut
    # invariant :
    # pour debut <= k < gauche, t[k] < pivot
    # pour gauche <= k < milieu, t[k] = pivot
    # pour milieu <= k < droite, t[k] > pivot
    # pour droite <= k < fin, cette valeur n'est pas triée.
    for droite in range(debut, fin):
        v = t[droite]
        if v < pivot:
            t[droite] = t[milieu]
            t[milieu] = t[gauche]
            t[gauche] = v
            gauche += 1
            milieu += 1
        elif v == pivot:
            t[droite] = t[milieu]
            t[milieu] = v
            milieu += 1
    return gauche, milieu


# %%


def selection(t, debut, fin, p):
    # print(debut, fin, p)
    # print(t[debut:fin])
    if fin < debut + 5:
        insertion(t, debut, fin)
        return t[debut + p]
    # sélection des médianes des paquets de 5
    d = debut
    for f in range(debut + 5, fin, 5):
        insertion(t, d, f)
        d = f
    insertion(t, d, fin)
    # déplacement des médianes en début de tableau
    i = debut
    for j in range(debut + 2, fin, 5):
        t[i], t[j] = t[j], t[i]
        i += 1
    pivot = selection(t, debut, i, (i - debut - 1) // 2)
    # print("pivot:", pivot, t[debut:fin])
    # partition autour du pivot
    gauche, milieu = partition(t, debut, fin, pivot)
    # print(t[debut:gauche], t[gauche:milieu], t[milieu:fin])
    if gauche > debut + p:
        return selection(t, debut, gauche, p)
    if milieu <= debut + p:
        return selection(t, milieu, fin, p - milieu + debut)
    return pivot

# %%


def selection3(t, debut, fin, p):
    # print(debut, fin, p)
    # print(t[debut:fin])
    if fin < debut + 3:
        insertion(t, debut, fin)
        return t[debut + p]
    # sélection des médianes des paquets de 5
    d = debut
    for f in range(debut + 3, fin, 3):
        insertion(t, d, f)
        d = f
    insertion(t, d, fin)
    # déplacement des médianes en début de tableau
    i = debut
    for j in range(debut + 1, fin, 3):
        t[i], t[j] = t[j], t[i]
        i += 1
    pivot = selection3(t, debut, i, (i - debut - 1) // 2)
    # print("pivot:", pivot, t[debut:fin])
    # partition autour du pivot
    gauche, milieu = partition(t, debut, fin, pivot)
    # print(t[debut:gauche], t[gauche:milieu], t[milieu:fin])
    if gauche > debut + p:
        return selection3(t, debut, gauche, p)
    if milieu <= debut + p:
        return selection3(t, milieu, fin, p - milieu + debut)
    return pivot

# %%

def test(n):
    a = [random.random() for _ in range(n)]
    return selection(a, 0, n, random.randint(0, n - 1))

timeit test(10)
17.8 µs ± 3.76 µs per loop (mean ± std. dev. of 7 runs, 10000 loops each)
198 µs ± 34.6 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
2.65 ms ± 102 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)
25.5 ms ± 3 ms per loop (mean ± std. dev. of 7 runs, 10 loops each)
269 ms ± 8.62 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
3.31 s ± 561 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
36.3 s ± 3.77 s per loop (mean ± std. dev. of 7 runs, 1 loop each)

# %%

def test3(n):
    a = [random.random() for _ in range(n)]
    return selection3(a, 0, n, random.randint(0, n - 1))

22.4 µs ± 2.61 µs per loop (mean ± std. dev. of 7 runs, 10000 loops each)
278 µs ± 41.3 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
3.29 ms ± 523 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)
39 ms ± 3.04 ms per loop (mean ± std. dev. of 7 runs, 10 loops each)
530 ms ± 115 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
5.59 s ± 810 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
7.36 s ± 1.42 s per loop (mean ± std. dev. of 7 runs, 1 loop each)
# %%
