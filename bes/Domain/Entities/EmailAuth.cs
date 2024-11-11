using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BES.Domain.Entities
{
    public class EmailAuth : AuditableEntity
    {
        public EmailAuth(string email, byte[] encryptPassword,  byte[] key, byte[] initVector)
        {
            Email = email;
            InitVector = initVector;
            Key = key;
            EncryptPassword = encryptPassword;
        }

        public void UpdatePassword(byte[] encryptPassword,  byte[] key, byte[] initVector)
        {
            InitVector = initVector;
            Key = key;
            EncryptPassword = encryptPassword;
        }
       
        public string Email { get; private set; }
        public byte[] EncryptPassword{ get; private set; } 
        public byte[] InitVector { get; private set; }
        public byte[] Key { get; private set; } 

     }
}
