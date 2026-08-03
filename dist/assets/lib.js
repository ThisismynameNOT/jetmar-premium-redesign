export function filterProjects(items, category) {
    return category === 'all' ? [...items] : items.filter(item => item.category === category);
}
export function validateQuote(data) {
    const errors = {};
    if (!data.buildingType)
        errors.buildingType = 'Vyberte typ objektu.';
    if (!data.roofType)
        errors.roofType = 'Vyberte typ střechy.';
    if (!Number.isFinite(data.area) || Number(data.area) <= 0)
        errors.area = 'Uveďte orientační plochu.';
    if (!data.problem || data.problem.trim().length < 10)
        errors.problem = 'Popište stav nebo požadavek podrobněji.';
    if (!data.name)
        errors.name = 'Uveďte jméno.';
    if (!data.phone || data.phone.replace(/\D/g, '').length < 9)
        errors.phone = 'Uveďte platný telefon.';
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email))
        errors.email = 'Uveďte platný e-mail.';
    return errors;
}
