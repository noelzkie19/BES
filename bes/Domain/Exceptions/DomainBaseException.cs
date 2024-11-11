namespace BES.Domain.Exceptions;

public abstract class DomainBaseException : Exception
{
    protected DomainBaseException(string message) : base(message)
    {
    }
}