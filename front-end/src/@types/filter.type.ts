export type FiltersProps = {
    filters: {
        selectedGenres: any[]
        selectedPlatforms: any[]
        selectedPublishers: any[]
        selectedCategories: any[]
        selectedDate?: number,
        selectedRating?: number,
        
    }
    setters: {
        setSelectedGenres: React.Dispatch<any[]>
        setSelectedPlatforms: React.Dispatch<any[]>
        setSelectedPublishers: React.Dispatch<any[]>
        setSelectedCategories: React.Dispatch<any[]>
        setSelectedDate: React.Dispatch<number>
        setSelectedRating: React.Dispatch<number>
    }
    module:  Record<string, string>
}