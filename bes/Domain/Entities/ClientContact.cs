using System;
using System.Collections.Generic;

namespace BES.Domain.Entities;
public class ClientContact : BaseEntity
{

    public ClientContact(int clientId, string contactName, string position, string phone, string mobile, string email, string notes)
    {
        ClientId = clientId;
        ContactName = contactName;
        Position = position;
        Phone = phone;
        Mobile = mobile;
        Email = email;
        Notes = notes;
    }

    public void Update(string contactName, string position, string phone, string mobile, string email, string notes)
    {
        ContactName = contactName;
        Position = position;
        Phone = phone;
        Mobile = mobile;
        Email = email;
        Notes = notes;
    }

    public int ClientId { get; private set; }
    public string ContactName { get; private set; } = null!;
    public string Position { get; private set; } = null!;
    public string Phone { get; private set; } = null!;
    public string Mobile { get; private set; } = null!;
    public string Email { get; private set; } = null!;
    public string? Notes { get; private set; }

    public virtual Client? Client { get; set; }
}

