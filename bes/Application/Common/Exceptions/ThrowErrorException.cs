namespace BES.Application.Common.Exceptions
{
    public class ThrowErrorException : Exception
    {
        public ThrowErrorException()
            : base()
        {
        }

        public ThrowErrorException(string message)
            : base(message)
        {
        }

        public ThrowErrorException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        public ThrowErrorException(string name, object key)
            : base($"Entity \"{name}\" ({key}) was not found.")
        {
        }
    }
}