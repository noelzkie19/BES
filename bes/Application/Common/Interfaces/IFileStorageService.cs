
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BES.Application.Common.Models;
using BES.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace BES.Application.Common.Interfaces;

public interface IFileStorageService
{
    Task<FileStorage> UploadFiles(IFormFile file);
}
