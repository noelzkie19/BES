﻿using Microsoft.EntityFrameworkCore;

namespace BES.Application.Common.Models;

public class PaginatedList<T>
{
    public List<T> Items { get; }
    public int PageNumber { get; }
    public int TotalPages { get; }
    public int TotalCount { get; }
    public PaginatedList(List<T> items, int count, int pageNumber, int pageSize)
    {
        PageNumber = pageNumber;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        TotalCount = count;
        Items = items;
    }

    public bool HasPreviousPage => PageNumber > 1;

    public bool HasNextPage => PageNumber < TotalPages;

    public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize, bool isGrid = false)
    {
        var count = await source.CountAsync();
        var items = isGrid ?
             await source.Skip(pageNumber).Take(pageSize).ToListAsync() :
             await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

        return new PaginatedList<T>(items, count, pageNumber, pageSize);
    }

    public static async Task<PaginatedList<T>> CreateSkipOnlyAsync(IQueryable<T> source, int skip)
    {
        var count = await source.CountAsync();
        var items = await source.Skip(skip).ToListAsync();

        return new PaginatedList<T>(items, count, skip, 0);
    }


}
