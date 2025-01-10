import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const ExpiryDateCheck = () => {
  const { data: requests, isLoading } = useQuery({
    queryKey: ['expiry-date-check'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exception_requests')
        .select(`
          id,
          title,
          residual_risk,
          status,
          submitted_at,
          expiry_date,
          expired
        `)
        .neq('status', 'rejected')  // Exclude rejected requests
        .order('submitted_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading expiry date checks...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expiry Date Verification (Last 10 Non-Rejected Entries)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Expected Duration</TableHead>
              <TableHead>Expired</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests?.map((request) => {
              const submittedDate = new Date(request.submitted_at);
              const expiryDate = request.expiry_date ? new Date(request.expiry_date) : null;
              
              let expectedDuration = '12 months'; // default
              if (request.residual_risk?.toLowerCase().includes('high')) {
                expectedDuration = '3 months';
              } else if (request.residual_risk?.toLowerCase().includes('medium')) {
                expectedDuration = '6 months';
              }

              const actualDuration = expiryDate 
                ? Math.round((expiryDate.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
                : null;

              return (
                <TableRow key={request.id}>
                  <TableCell>{request.title}</TableCell>
                  <TableCell>{request.residual_risk || 'N/A'}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>{submittedDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    {expiryDate?.toLocaleDateString() || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {expectedDuration}
                    {actualDuration && ` (Actual: ${actualDuration} months)`}
                  </TableCell>
                  <TableCell>
                    {request.expired ? 'Yes' : 'No'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};