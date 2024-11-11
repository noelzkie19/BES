using System;
using System.Collections.Generic;

namespace BES.Domain.Entities
{
    public class FileStorage : AuditableEntity
    {
        public FileStorage() {}
        public FileStorage(string fileType, string fileKey)
        {
            FileType =  fileType;
            FileKey = fileKey;
        }

        public string FileType { get; private set; }
        public string FileKey { get; private set; }
    }
}
