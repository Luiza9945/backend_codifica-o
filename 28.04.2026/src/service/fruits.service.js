class FrutasService {
    async getAll(){
        try{
            const query = "SELECT * FROM frutas"
            const res = await SecurityPolicyViolationEvent.query(query)
            return(res.rows);
            
        } catch (error) {
            console.error(error);
        
        }
    }
}

export const fruitsService = new FrutasService()