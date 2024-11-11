using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace BES.Domain.Entities
{
    public class Operation : AuditableEntity
    {
        public Operation() {
        }
        public Operation(int jobId, int number, string description, int quantity, int priority, string notes, int quoteId
            ,decimal? expectedProcessTime , decimal prog , decimal set , decimal run , decimal other, int? oprator, DateTime? dateCompleted
            ,string? resource, decimal hourlyRate, int? resourceId)
        {
            JobId = jobId;
            Number = number;
            Description = description;
            Quantity = quantity;
            Priority = priority;
            Notes = notes;
            ExpectedProcessTime = expectedProcessTime;
            Prog = prog;
            Set = set;
            Run = run;
            Other = other;
            DateCompleted = dateCompleted;
            Resource = resource;
            HourlyRate = hourlyRate;
            OperatorId = oprator;
            ResourceId = resourceId;
        }

        public void Update(int jobId, int number, string description, int quantity, int priority, string notes, int quoteId
            ,decimal? expectedProcessTime , decimal prog , decimal set , decimal run , decimal other, int? oprator, DateTime? dateCompleted
            ,string? resource, decimal hourlyRate, int? resourceId)
        {
            JobId = jobId;
            Number = number;
            Description = description;
            Quantity = quantity;
            Priority = priority;
            Notes = notes;
            ExpectedProcessTime = expectedProcessTime;
            Prog = prog;
            Set = set;
            Run = run;
            Other = other;
            DateCompleted = dateCompleted;
            Resource = resource;
            OperatorId = oprator;
            ResourceId = resourceId;
            // FirstFocHr = firstFocHr;
            // FirstFocOperatorId = firstFocOperatorId > 0 ? firstFocOperatorId : null;
            // SecondFocHr = secondFocHr;
            // SecondFocOperatorId = secondFocOperatorId > 0 ? secondFocOperatorId : null;
            // ThirdFocHr = thirdFocHr;
            // ThirdFocOperatorId = thirdFocOperatorId > 0 ? thirdFocOperatorId : null;
            // FourthFocHr = fourthFocHr;
            // FourthFocOperatorId = fourthFocOperatorId > 0 ? fourthFocOperatorId : null;
            // FirstPcHr = firstPcHr;
            // FirstPcOperatorId = firstPcOperatorId > 0 ? firstPcOperatorId : null;
            // SecondPcHr = secondPcHr;
            // SecondPcOperatorId = secondPcOperatorId > 0 ? secondPcOperatorId : null;
            // ThirdPcHr = thirdPcHr;
            // ThirdPcOperatorId = thirdPcOperatorId > 0 ? thirdPcOperatorId : null;
            // FourthPcHr = fourthPcHr;
            // FourthPcOperatorId = fourthPcOperatorId > 0 ? fourthPcOperatorId : null;
            HourlyRate = hourlyRate;
        }

        public void setProcessInspection(bool proInsFirst1, bool proInsFirst2, bool proInsFirst3, bool proInsINS) 
        {
            ProInsFirst1 = proInsFirst1;
            ProInsFirst2 = proInsFirst2;
            ProInsFirst3 = proInsFirst3;
            ProInsINS = proInsINS;
        }
        public void setMachine(int? machine) 
        {
            MachineId = machine;
        }
        public void setStaff(int? staffId)
        {
            StaffId = staffId;
        }


        public int Number { get; private set; }
        public int JobId { get; private set;  }
        public string Description { get; private set; } = null!;
        public DateTime? DateCompleted { get; private set; }
        public int Hours { get; private set; }
        public int Quantity { get; private set; }
        public int Priority { get; private set; }
        public string Notes { get; private set; } = null!;
        public bool ProgDone { get; private set; }
        // public int QuoteId { get; private set; }
        public decimal? ExpectedProcessTime { get; private set; }
        public decimal Prog { get; private set; }
        public decimal Set { get; private set; }
        public decimal Run { get; private set; }
        public decimal Other { get; private set; }
        public int? OperatorId { get; private set; }
        public int? MachineId { get; private set; }
        public int? StaffId { get; private set; }

        // public int FirstFocHr { get; set; }
        // public int? FirstFocOperatorId { get; set; }
        // public int SecondFocHr { get; set; }
        // public int? SecondFocOperatorId { get; set; }
        // public int ThirdFocHr { get; set; }
        // public int? ThirdFocOperatorId { get; set; }
        // public int FourthFocHr { get; set; }
        // public int? FourthFocOperatorId { get; set; }
        // public int FirstPcHr { get; set; }
        // public int? FirstPcOperatorId { get; set; }
        // public int SecondPcHr { get; set; }
        // public int? SecondPcOperatorId { get; set; }
        // public int ThirdPcHr { get; set; }
        // public int? ThirdPcOperatorId { get; set; }
        // public int FourthPcHr { get; set; }
        // public int? FourthPcOperatorId { get; set; }
        public decimal HourlyRate { get; set; }
        
        public bool ProInsFirst1 { get; set; }
        public bool ProInsFirst2 { get; set; }
        public bool ProInsFirst3 { get; set; }
        public bool ProInsINS { get; set; }

        public virtual Job Job { get; private set; } = null!;
        public string? Resource { get; private set; }
        public int? ResourceId { get; private set; }

        [ForeignKey("ResourceId")]
        public virtual Resource? ResourceDetail { get; set; }

        [ForeignKey("OperatorId")]
        public virtual UserAccount? Operator { get; set; }


        [ForeignKey("MachineId")]
        public virtual Machine? Machine { get; set; }

        [ForeignKey("StaffId")]
        public virtual UserAccount? UserAccount { get; set; }


        // [ForeignKey("FirstFocOperatorId")]
        // public virtual UserAccount? FirstFocOperator { get; set; }
        // [ForeignKey("SecondFocOperatorId")]
        // public virtual UserAccount? SecondFocOperator { get; set; }
        // [ForeignKey("ThirdFocOperatorId")]
        // public virtual UserAccount? ThirdFocOperator { get; set; }
        // [ForeignKey("FourthFocOperatorId")]
        // public virtual UserAccount? FourthFocOperator { get; set; }

        // [ForeignKey("FirstPcOperatorId")]
        // public virtual UserAccount? FirstPcOperator { get; set; }
        // [ForeignKey("SecondPcOperatorId")]
        // public virtual UserAccount? SecondPcOperator { get; set; }
        // [ForeignKey("ThirdPcOperatorId")]
        // public virtual UserAccount? ThirdPcOperator { get; set; }
        // [ForeignKey("FourthPcOperatorId")]
        // public virtual UserAccount? FourthPcOperator { get; set; }


        // public virtual Quote Quote { get; private set; } = null!;
    }
}
