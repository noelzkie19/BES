using BES.Application.Common.Repository.Clients.Model;
using BES.Domain.Entities;
namespace BES.Application.Common.Repository.Clients;
public interface IClientRepository
{
  Task<IEnumerable<ClientDto>> GetByPaginationAsync();
}
