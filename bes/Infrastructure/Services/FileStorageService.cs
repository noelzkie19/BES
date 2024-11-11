using System.Text;
using BES.Application.Common.Exceptions;
using BES.Application.Common.Interfaces;
using BES.Application.Common.Models;
using BES.Domain.Entities;
using BES.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;
namespace BES.Infrastructure.Identity;

public class FileStorageService : IFileStorageService
{  
    private readonly IConfiguration _configuration;
    public FileStorageService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<FileStorage> UploadFiles(IFormFile file)
    {
        var uploads = Path.Combine(_configuration["FileStorage"], "Uploads");
        bool folderExists = Directory.Exists(uploads);
        if (!folderExists) {
            Directory.CreateDirectory(uploads);
        }
        
        string[] fileNameArray = file.FileName.Split('.');
        var newFileName = fileNameArray[0] + DateTime.Now.ToString("MM-dd-yyyy-HHmmss") + "." + fileNameArray[^1];
        newFileName = newFileName.Replace(" ", "");
        string filePath = Path.Combine(uploads, newFileName);
        using (Stream fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
        {
            await file.CopyToAsync(fileStream);
        }
        string fileExtension = Path.GetExtension(filePath);
        var fileStorage = new FileStorage(".pdf", filePath);
        return fileStorage;
    }
}
