namespace BES.Application.Common.Extensions;

public static class Extensions
{
    public static DateTime ToCleanDateTime(this DateTime dt)
    {
      return new DateTime(dt.Year, dt.Month, dt.Day, 0, 0, 0, 0);      
    }

    public static DateTime? ToCleanDateTime(this DateTime? dt)
    {
        if (dt.HasValue)
        {
            return dt.Value.ToCleanDateTime();
        }
        return dt;
    }

    public static string ToCleanDateTimeString(this DateTime? dt)
    {
        if (dt.HasValue)
        {
            return dt.Value.ToShortDateString();
        } else {
            return "";
        }
    }

    public static string ToDateString(this DateTime? dt)
    {
        if (dt.HasValue)
        {
            int day = dt.Value.Day;
            return day < 10 ? dt.Value.ToString("MMM  d yyyy") : dt.Value.ToString("MMM dd yyyy");
        } else {
            return "";
        }
    }

    public static string ToDateString(this DateTime? dt, string format)
    {
        if (dt.HasValue)
        {
            return dt.Value.ToString(format);
        }
        else
        {
            return "";
        }
    }


    public static string ToTrimQuoteParent(this string Value)
    {
        var result = Value;
        int index = result.IndexOf('-');
        if (index >= 0) {
            result = result.Remove(index, Value.Length - index);
        }
        return result;
    }

    public static string ToTrimQuoteVersion(this string Value)
    {
        var result = Value;
        int index = result.IndexOf('-');
        if (index >= 0) {
            result = result.Remove((index + 1), Value.Length - (index+1));
        } else {
           result =  result + "-";
        }
        return result;
    }

    public static string ToTrimFilter(this string Value, string filter)
    {
        var result = Value;
        var fLength = filter.Length;
        if (result.Length > fLength) {
            result = result.Substring(0, fLength);
        }
        return result;
    }
}