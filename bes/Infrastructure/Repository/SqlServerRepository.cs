using System.Data.Common;
using System.Text.RegularExpressions;
using Dapper;
using System.Data.SqlClient;
using System.Data;

namespace BES.Infrastructure.Repository;
public interface ISqlServerRepository
{
    void Execute(string action);
    void Execute(string action, object parameters);
    T ExecuteThenReturn<T>(string action);
    T ExecuteThenReturn<T>(string action, object parameters);
    IEnumerable<T> ExecuteThenReturnList<T>(string action);
    IEnumerable<T> ExecuteThenReturnList<T>(string action, object parameters);
}

public class SqlServerRepository : ISqlServerRepository
{
    #region Properties
    /// <summary>
    /// Properties for this NpgSqlServer repository
    /// </summary>
    private DbConnectionStringBuilder builder = new DbConnectionStringBuilder();
    private readonly string _connectionString;
    private static readonly Regex _StoredProcedureRegex = new Regex(@"^\W*?(\[?\S+\]?\.)?(\[?\S+\]?\.?)\W*$", RegexOptions.Compiled | RegexOptions.IgnoreCase);
    #endregion

    #region Contructor
    /// <summary>
    /// SqlServerRepository Constructor
    /// </summary>
    public SqlServerRepository(string connectionString)
    {
        if (connectionString == null || connectionString == "")
        {
            throw new ArgumentNullException("connectionString");
        }

        builder.ConnectionString = connectionString;

        _connectionString = builder.ConnectionString;
    }
    #endregion

    #region Methods
    /// <summary>
    /// PostgreSQL Methods
    /// </summary>
    /// <returns></returns>
    protected virtual SqlConnection CreateNpgSqlConnection()
    {
        return new SqlConnection(_connectionString);
    }

    protected virtual CommandType GetCommandType(string action)
    {
        return _StoredProcedureRegex.IsMatch(action) ? CommandType.StoredProcedure : CommandType.Text;
    }

    public virtual void Execute(string action)
    {
        Execute(action, parameters: null);
    }

    public virtual void Execute(string action, object parameters)
    {
        try
        {
            using (IDbConnection npgSqlConnection = CreateNpgSqlConnection())
            {
                SqlMapper.Execute(npgSqlConnection, action, parameters, commandType: GetCommandType(action));
            }
        }
        catch (Exception ex)
        {
            ex.Data.Add(Guid.NewGuid() + " action", action);
            ex.Data.Add(Guid.NewGuid() + " parameters", parameters);
            throw;
        }
    }

    public virtual T ExecuteThenReturn<T>(string action)
    {
        return ExecuteThenReturn<T>(action, parameters: null);
    }

    public virtual T ExecuteThenReturn<T>(string action, object parameters)
    {
        return ExecuteThenReturnList<T>(action, parameters).FirstOrDefault();
    }

    public virtual IEnumerable<T> ExecuteThenReturnList<T>(string action)
    {
        return ExecuteThenReturnList<T>(action, parameters: null);
    }

    public virtual IEnumerable<T> ExecuteThenReturnList<T>(string action, object parameters)
    {

        try
        {
            using (IDbConnection npgSqlConnection = CreateNpgSqlConnection())
            {
                return SqlMapper.Query<T>(npgSqlConnection, action, parameters, commandType: GetCommandType(action));
            }
        }
        catch (SqlException ex)
        {
            ex.Data.Add(Guid.NewGuid() + " action", action);
            ex.Data.Add(Guid.NewGuid() + " exception", ex.Message);
            throw;
        }
    }
    #endregion

}