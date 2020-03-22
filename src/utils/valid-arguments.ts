import ArgumentSpecification from "../models/ArgumentSpecification";

function validArgumentsLength(args: string[], specs: ArgumentSpecification[]): boolean {
    return args.length >= specs.filter(spec => spec.required).length
}

export default function validArguments(args: string[], specs: ArgumentSpecification[]): boolean {
    if (!validArgumentsLength(args, specs))
        return false
    
    for (let i = 0; i < specs.length; i++) {
        const spec = specs[i]
        const arg = args[i]
        
        if (!arg && spec.required)
            return false
    }

    return true
}