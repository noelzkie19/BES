using MediatR;
using BES.Application.Common.Interfaces;
using BES.Domain.Entities;

namespace BES.Application.AboutAggregate.Commands.CreateAbout;
public class CreateAbout : IRequest<int>
{
    public string Address { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Website { get; set; } = null!;
    public string ABN { get; set; } = null!;
}

public class CreateAboutHandler : IRequestHandler<CreateAbout, int>
{
    private readonly IApplicationDbContext _context;

    public CreateAboutHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateAbout request, CancellationToken cancellationToken)
    {
        var newAbout = new About(request.Address, request.Phone, request.Email, request.Website , request.ABN);

        _context.Abouts.Add(newAbout);
        await _context.SaveChangesAsync(cancellationToken);
        return newAbout.Id;

    }
}
