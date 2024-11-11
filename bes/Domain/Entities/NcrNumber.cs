using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class NcrNumber : BaseEntity
    {
        public NcrNumber() { }

        public NcrNumber(long lastNcrNumber)
        {
           LastNcrNumber = lastNcrNumber;
        }

        public void Update(long lastNcrNumber)
        {
            LastNcrNumber = lastNcrNumber;
        }

        public long LastNcrNumber { get; private set; }
        
    }
}
