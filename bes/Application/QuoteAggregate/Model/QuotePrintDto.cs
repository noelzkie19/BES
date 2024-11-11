using BES.Application.Common.Mappings;
using BES.Domain.Entities;
using AutoMapper;

namespace BES.Application.QuoteAggregate.Model
{
    public class QuotePrintDto
    {
        public string QuoteNumber { get; set;} = string.Empty;
        public IList<QuoteDetailDto>? details { get; set; }
    }
}