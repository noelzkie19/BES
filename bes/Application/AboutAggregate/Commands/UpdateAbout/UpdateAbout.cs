using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;
using BES.Application.SupplierAggregate.Model;
using BES.Application.Common.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace BES.Application.AboutAggregate.Commands.UpdateAbout;
public class UpdateAbout : IRequest<int>
{
    public int Id { get; set; }
    public string Address { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Website { get; set; } = null!;
    public string ABN { get; set; } = null!;
}

public class UpdateAboutHandler : IRequestHandler<UpdateAbout, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateAboutHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateAbout request, CancellationToken cancellationToken)
    {
        var about = await _context.Abouts
                   .FindAsync(new object[] { request.Id }, cancellationToken);

        if (about == null)
            throw new NotFoundException("About does not exists.");

        about.Update(request.Address, request.Phone, request.Email, request.Website , request.ABN);

        _context.Abouts.Update(about);
        await _context.SaveChangesAsync(cancellationToken);
        return about.Id;
    }


    

}
