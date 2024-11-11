namespace BES.Infrastructure.Repository;

public class BaseSqlServerService
{
     #region Properties
    /// <summary>
    /// List of properties for server service
    /// </summary>
    public readonly ISqlServerRepository _sqlServerRepository;
    #endregion

      #region Constructor
    /// <summary>
    /// Server service base constructor
    /// </summary>
    /// <param name="npgSqlServerRepository"></param>
    public BaseSqlServerService(ISqlServerRepository sqlServerRepository)
    {
        if (sqlServerRepository == null) throw new ArgumentNullException("npgsqlServerRepository");

        _sqlServerRepository = sqlServerRepository;
    }
    #endregion
}