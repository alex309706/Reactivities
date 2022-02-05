using System.Threading;
using System.Threading.Tasks;
using API.DTOs;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command:IRequest<Result<Unit>>
        {
            public ProfileEditDto Profile { get; set; }
        }
        
        public class Handler:IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context,IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            
            public class  CommandValidator:AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(profile => profile.Profile).SetValidator(new ProfileValidator());
                }
            }

            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x=> x.UserName == _userAccessor.GetUsername());

               if (user == null) return null;

               user.UserName = request.Profile.DisplayName.ToLower();
               user.DisplayName = request.Profile.DisplayName;
               user.Bio = request.Profile.Bio;

               _context.Users.Update(user);

               var result = await _context.SaveChangesAsync(cancellationToken) > 0;

               return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Could not update profile");
            }
        }
    }
}