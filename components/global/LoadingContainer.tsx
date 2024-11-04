import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
// using in suspense component as fallback
function LoadingContainer() {
  return <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <LoadingProduct/>
    <LoadingProduct/>
    <LoadingProduct/>
    <LoadingProduct/>
  </div>;
}

function LoadingProduct(){
    return(
        <Card>
            <CardContent>
                <Skeleton className="h-48"/>
                <Skeleton className="h-4 w-3/4 mt-4"/>
                <Skeleton className="h-4 w-1/2 mt-4"/>                
            </CardContent>
        </Card>
    )
}

export default LoadingContainer;
