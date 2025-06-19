type Props = {
  params: {
    slug: string[];
    locale: string;
  };
};

const DynamicPage = async ({ params }: Props) => {
  return <div>DynamicPage {JSON.stringify(params)}</div>;
};

export default DynamicPage;
