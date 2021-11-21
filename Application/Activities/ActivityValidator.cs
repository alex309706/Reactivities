using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator:AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(Activity=>Activity.Title).NotEmpty();
            RuleFor(Activity=>Activity.Description).NotEmpty();
            RuleFor(Activity=>Activity.Category).NotEmpty();
            RuleFor(Activity=>Activity.City).NotEmpty();
            RuleFor(Activity=>Activity.Date).NotEmpty();
            RuleFor(Activity=>Activity.Venue).NotEmpty();
        }
    }
}