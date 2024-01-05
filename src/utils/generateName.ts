export const generateFolderName = (
    typedName: string,
    folderNames: string[]
): string => {
    let newName: string = typedName;
    let count: number = 1;

    while (folderNames.includes(newName)) {
        newName = `${typedName} (${count})`;
        count++;
    }

    return newName;
};
