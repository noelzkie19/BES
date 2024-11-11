
using BES.Domain.Entities;
namespace BES.Application.ClientAggregate.Model
{
    public class ClientVm
    {
        public Client Client { get; set; }
        public ClientAddress? ClientAddress { get; set; }
    }
}