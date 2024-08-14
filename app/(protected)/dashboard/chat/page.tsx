"use client"
import { useMail } from "@/components/chat/chat";
import ContactList from "@/components/chat/ContactList";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import React from "react";
import {useCookies} from "react-cookie";

interface MailItem {
    id: string;
    creator: {
      name: string;
    };
    read: boolean;
    updated_at: string;
    labels: string[];
  }
  interface MailProps {
    mails: MailItem[];
    defaultLayout: number[] | undefined;
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
  }

const page = ({defaultLayout = [265, 360, 655] }: MailProps) => {
  const [mail] = useMail();
  const [isMobile, setIsMobile] = React.useState(false);
  const [message, setMessage] = React.useState([]);
  const [sheetState, setSheetState] = React.useState(false);
  const [cookie, setCookie] = useCookies([
    "react-resizable-panels:collapsed",
    "react-resizable-panels:layout",
  ]);

  const GetMessages = async () => {
    if (!mail.selected) {
      return;
    }
    let data: any = await fetch(
      `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${mail.selected}`
    );
    data = await data.json();
    setMessage(data);
  };

  React.useEffect(() => {
    GetMessages();
  }, [mail.selected]);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const updateSheetState = (val: boolean) => {
    setSheetState(val);
  };

  return (
    <div className="w-full h-full p-4">
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          setCookie("react-resizable-panels:layout", JSON.stringify(sizes));
        }}
        className="h-full max-h-[800px] border rounded-lg items-stretch"
      >
        {isMobile && mail.selected ? null : (
          <ResizablePanel defaultSize={23} minSize={25} maxSize={35}>
            <ContactList sheetState={sheetState} items={mails} />
          </ResizablePanel>
        )}
        {!isMobile && <ResizableHandle withHandle />}
        {isMobile ? (
          mail.selected ? (
            <ResizablePanel defaultSize={defaultLayout[2]}>
            </ResizablePanel>
          ) : null
        ) : (
          <ResizablePanel defaultSize={defaultLayout[2]}>
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default page;

const mails =[  {
    id: '1',
    creator: {
      name: 'John Doe',
    },
    read: false,
    updated_at: '2024-08-14T10:30:00Z',
    labels: ['Important', 'Work'],
  },
  {
    id: '2',
    creator: {
      name: 'Jane Smith',
    },
    read: true,
    updated_at: '2024-08-13T15:45:00Z',
    labels: ['Personal', 'Urgent'],
  },
  {
    id: '3',
    creator: {
      name: 'Alice Johnson',
    },
    read: false,
    updated_at: '2024-08-12T08:20:00Z',
    labels: ['Newsletter'],
  },
  {
    id: '4',
    creator: {
      name: 'Bob Brown',
    },
    read: true,
    updated_at: '2024-08-11T11:00:00Z',
    labels: ['Work'],
  },
  {
    id: '5',
    creator: {
      name: 'Carol White',
    },
    read: false,
    updated_at: '2024-08-10T17:25:00Z',
    labels: ['Important', 'Family'],
  },]