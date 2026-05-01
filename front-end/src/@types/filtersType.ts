export type FiltersProps = {
    filters: {
        selectedGenres: any[]
        selectedPlatforms: any[]
        selectedPublishers: any[]
        selectedCategories: any[]
    }
    setters: {
        setSelectedGenres: React.Dispatch<any[]>
        setSelectedPlatforms: React.Dispatch<any[]>
        setSelectedPublishers: React.Dispatch<any[]>
        setSelectedCategories: React.Dispatch<any[]>
    }
    module:  Record<string, string>
}