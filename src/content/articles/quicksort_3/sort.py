@profile
def insertsort1(l):
    for i in range(1, len(l)):
        v = l[i]
        j = i - 1
        while True:
            if j < 0:
                break
            if l[j] <= v:
                break
            l[j + 1] = l[j]
            j -= 1
        l[j + 1] = v

@profile
def insertsort2(l):
    for i in range(1, len(l)):
        v = l[i]
        if v < l[0]:
            # On décale tout vers la droite…
            j = i
            while j > 0:
                l[j] = l[j - 1]
                j -= 1
            # …avant de ranger v dans la première case.
            l[0] = v
        else:
            j = i - 1
            # On examine les valeurs une par une en partant du range i - 1…
            while l[j] > v:
                # …sans avoir besoin de garde.
                l[j + 1] = l[j]
                j -= 1
            l[j + 1] = v

