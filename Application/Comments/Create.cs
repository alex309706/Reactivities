using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Persistance;

namespace Application.Comments
{
    public class Create
    {
        public class Command: IRequest<Result<CommentDto>>
        {
            public Guid ActivityId { get; set; }
            
            public string Body { get; set; }
        }

        class CommentValidator : AbstractValidator<Command>
        {
            public CommentValidator()
            {
                RuleFor(c=> c.Body).NotEmpty();
            }
        }

        class Handler: IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }
            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == request.ActivityId);

                if (activity == null) return null;

                var user = await _context.Users.Include(u=> u.Photos)
                    .SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                var comment = new Comment()
                {
                    Author = user,
                    Body = request.Body,
                    Activity = activity
                };

                activity.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));

                return Result<CommentDto>.Failure("Failed to create comment!");
            }
        }
    }
}