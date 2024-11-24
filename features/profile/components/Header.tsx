import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const Header = () => {
  return (
    <Card className="bg-muted">
      <CardContent className="p-6">
        <div>
          <h2 className="font-medium text-2xl text-foreground">Account Setting</h2>
          <p className="text-lg font-normal text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Header;
