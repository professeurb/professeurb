// /usr/local/Cellar/gcc/9.2.0/include/c++/9.2.0

template <typename _Iterator, typename _Compare>
void __move_median_to_first(_Iterator __result,
                            _Iterator __a,
                            _Iterator __b,
                            _Iterator __c,
                            _Compare __comp)
{
    if (__comp(__a, __b))
    {
        if (__comp(__b, __c))
            std::iter_swap(__result, __b);
        else if (__comp(__a, __c))
            std::iter_swap(__result, __c);
        else
            std::iter_swap(__result, __a);
    }
    else if (__comp(__a, __c))
        std::iter_swap(__result, __a);
    else if (__comp(__b, __c))
        std::iter_swap(__result, __c);
    else
        std::iter_swap(__result, __b);
}

template <typename _RandomAccessIterator, typename _Compare>
void __unguarded_linear_insert(_RandomAccessIterator __last,
                               _Compare __comp)
{
    typename iterator_traits<_RandomAccessIterator>::value_type
        __val = _GLIBCXX_MOVE(*__last);
    _RandomAccessIterator __next = __last;
    --__next;
    while (__comp(__val, __next))
    {
        *__last = _GLIBCXX_MOVE(*__next);
        __last = __next;
        --__next;
    }
    *__last = _GLIBCXX_MOVE(__val);
}

template <typename _RandomAccessIterator, typename _Compare>
void __insertion_sort(_RandomAccessIterator __first,
                      _RandomAccessIterator __last,
                      _Compare __comp)
{
    if (__first == __last)
        return;

    for (_RandomAccessIterator __i = __first + 1; __i != __last; ++__i)
    {
        if (__comp(__i, __first))
        {
            typename iterator_traits<_RandomAccessIterator>::value_type
                __val = _GLIBCXX_MOVE(*__i);
            _GLIBCXX_MOVE_BACKWARD3(__first, __i, __i + 1);
            *__first = _GLIBCXX_MOVE(__val);
        }
        else
            std::__unguarded_linear_insert(__i,
                                           __gnu_cxx::__ops::__val_comp_iter(__comp));
    }
}

/// This is a helper function for the sort routine.
template <typename _RandomAccessIterator, typename _Compare>
inline void __unguarded_insertion_sort(_RandomAccessIterator __first,
                                       _RandomAccessIterator __last,
                                       _Compare __comp)
{
    for (_RandomAccessIterator __i = __first; __i != __last; ++__i)
        std::__unguarded_linear_insert(__i,
                                       __gnu_cxx::__ops::__val_comp_iter(__comp));
}

enum
{
    _S_threshold = 16
};

/// This is a helper function for the sort routine.
template <typename _RandomAccessIterator, typename _Compare>
void __final_insertion_sort(_RandomAccessIterator __first,
                            _RandomAccessIterator __last,
                            _Compare __comp)
{
    if (__last - __first > int(_S_threshold))
    {
        std::__insertion_sort(__first, __first + int(_S_threshold), __comp);
        std::__unguarded_insertion_sort(__first + int(_S_threshold), __last,
                                        __comp);
    }
    else
        std::__insertion_sort(__first, __last, __comp);
}

/// This is a helper function...
template <typename _RandomAccessIterator, typename _Compare>
_RandomAccessIterator __unguarded_partition(_RandomAccessIterator __first,
                                            _RandomAccessIterator __last,
                                            _RandomAccessIterator __pivot,
                                            _Compare __comp)
{
    while (true)
    {
        while (__comp(__first, __pivot))
            ++__first;
        --__last;
        while (__comp(__pivot, __last))
            --__last;
        if (!(__first < __last))
            return __first;
        std::iter_swap(__first, __last);
        ++__first;
    }
}

/// This is a helper function...
template <typename _RandomAccessIterator, typename _Compare>
inline _RandomAccessIterator __unguarded_partition_pivot(_RandomAccessIterator __first,
                                                         _RandomAccessIterator __last, _Compare __comp)
{
    _RandomAccessIterator __mid = __first + (__last - __first) / 2;
    std::__move_median_to_first(__first, __first + 1, __mid, __last - 1,
                                __comp);
    return std::__unguarded_partition(__first + 1, __last, __first, __comp);
}

template <typename _RandomAccessIterator, typename _Compare>
inline void __partial_sort(_RandomAccessIterator __first,
                           _RandomAccessIterator __middle,
                           _RandomAccessIterator __last,
                           _Compare __comp)
{
    std::__heap_select(__first, __middle, __last, __comp);
    std::__sort_heap(__first, __middle, __comp);
}

/// This is a helper function for the sort routine.
template <typename _RandomAccessIterator, typename _Size, typename _Compare>
void __introsort_loop(_RandomAccessIterator __first,
                      _RandomAccessIterator __last,
                      _Size __depth_limit, _Compare __comp)
{
    while (__last - __first > int(_S_threshold))
    {
        if (__depth_limit == 0)
        {
            std::__partial_sort(__first, __last, __last, __comp);
            return;
        }
        --__depth_limit;
        _RandomAccessIterator __cut =
            std::__unguarded_partition_pivot(__first, __last, __comp);
        std::__introsort_loop(__cut, __last, __depth_limit, __comp);
        __last = __cut;
    }
}

template <typename _RandomAccessIterator, typename _Compare>
inline void __sort(_RandomAccessIterator __first, _RandomAccessIterator __last,
                   _Compare __comp)
{
    if (__first != __last)
    {
        std::__introsort_loop(__first, __last,
                              std::__lg(__last - __first) * 2,
                              __comp);
        std::__final_insertion_sort(__first, __last, __comp);
    }
}
