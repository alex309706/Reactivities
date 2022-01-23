using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Photos
{
    public class Add
    {
        public class Command: IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }
        
        public class Handler: IRequestHandler<Command, Result<Photo>> 
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly DataContext _context;

            public Handler(IUserAccessor userAccessor, IPhotoAccessor photoAccessor, DataContext context)
            {
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
                _context = context;
            }
            
            public async Task<Result<Photo>> Handle (Command request,CancellationToken token)
            {
                var user = await _context.Users.Include(x => x.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername(),token);

                if (user == null) return null;

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                var photo = new Photo()
                {
                    Id = photoUploadResult.PublicId,
                    Url = photoUploadResult.Url
                };

                if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;
                
                user.Photos.Add(photo);
                var result = await _context.SaveChangesAsync(token) > 0 ;
                
                if (result) return Result<Photo>.Success(photo);

                return Result<Photo>.Failure("Problem adding photo");

            }
        }
    }
}