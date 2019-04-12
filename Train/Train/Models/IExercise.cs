namespace Train.Models
{
    public interface IExercise
    {
        int Id { get; set; }
        string Name { get; set; }
        string Notes { get; set; }
    }
}
