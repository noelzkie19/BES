using System.Data.SqlClient;
using AutoMapper.Configuration;
using BES.Application.Common.Repository;
using BES.Application.Common.Repository.Clients;
using BES.Application.Common.Repository.Clients.Model;

namespace BES.Infrastructure.Repository.Clients;

public class ClientRepository : BaseSqlServerService, IClientRepository
{
    // private BaseSqlServerService baseSql;
    public ClientRepository(ISqlServerRepository sqlServerRepository) : base(sqlServerRepository)
    {
        // baseSql = new BaseSqlServerService(sqlServerRepository);
    }

    public async Task<IEnumerable<ClientDto>> GetByPaginationAsync()
    {
        try
        {
            return await Task.Run(() => _sqlServerRepository.ExecuteThenReturnList<ClientDto>("dbo.sp_getClientPagination"));
        }
        catch (SqlException ex)
        {
            throw ex;
        }
    }
}