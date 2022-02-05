using API.DTOs;
using FluentValidation;

namespace Application.Profiles
{
    public class ProfileValidator:AbstractValidator<ProfileEditDto>
    {
        public ProfileValidator()
        {
            RuleFor(Profile => Profile.DisplayName).NotEmpty();
        }
    }
}